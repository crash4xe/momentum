import React, { useContext, useRef, useState } from "react";
import { Avatar, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { styleContext } from "../App";
import { Check } from "@mui/icons-material";
import {
  addPhoto,
  removePhoto,
  updateProfile,
} from "../services/updateProfile";
import { deleteImage, getURL, uploadImage } from "../services/uploadImage";

const Profile = ({ profile, setCurrentView, setProfile }) => {
  const styles = useContext(styleContext);
  const user = useContext(AuthContext).authenticated.user;
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile.name);
  const { authenticated } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const fileInputRef = useRef(null);

  function handleSaveClick() {
    if (profile.name !== name && name !== "") {
      updateProfile(authenticated, name, setProfile);
    }
    setIsEditing(false);
  }

  function handleEditClick() {
    setIsEditing(true);
  }

  function handleAvatarClick(e) {
    setAnchorEl(e.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleUploadPhoto() {
    fileInputRef.current.click();
    handleClose();
  }

  async function handleRemovePhoto() {
    if (profile.url) {
      await removePhoto(authenticated, setProfile, null);
      await deleteImage(authenticated);
    }
    handleClose();
  }

  async function handlePhotoChange(e) {
    const file = e.target.files[0];

    await uploadImage(file, authenticated);
    const { imageUrl, expiry } = await getURL(authenticated);
    await addPhoto(authenticated, setProfile, imageUrl, expiry);
  }

  return (
    <div className="profile-container" style={{ textAlign: "center" }}>
      <div className="profile-info">
        <Tooltip title="Change your avatar">
          <Avatar
            alt={profile.name}
            src={profile.url ? profile.url : "/broken-image"}
            sx={{ width: 100, height: 100, margin: "auto", cursor: "pointer" }}
            onClick={handleAvatarClick}
          />
        </Tooltip>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleUploadPhoto} sx={{ fontSize: "11px" }}>
            Upload Photo
          </MenuItem>
          <MenuItem onClick={handleRemovePhoto} sx={{ fontSize: "11px" }}>
            Remove Photo
          </MenuItem>
        </Menu>
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handlePhotoChange}
        />

        {isEditing ? (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              height: "2rem",
              border: "none",
              outline: "none",
              fontSize: styles.font,
              backgroundColor: "transparent",
              color: styles.darkest,
              display: "inline-block",
              borderBottom: "1px solid black",
              margin: "14px",
            }}
          />
        ) : (
          <Tooltip title="Click to edit your name">
            <h3
              style={{
                display: "inline-block",
                padding: "none",
                cursor: "pointer",
              }}
              onClick={handleEditClick}
            >
              {profile.name}
            </h3>
          </Tooltip>
        )}
        <IconButton onClick={handleSaveClick}>
          {isEditing && <Check />}
        </IconButton>
        <div>{user.email}</div>
        <button
          style={{
            width: "50%",
            height: "2.5rem",
            borderRadius: styles.borderRadius,
            border: "none",
            outline: "none",
            padding: "10px",
            boxSizing: "border-box",
            fontSize: "14px",
            marginTop: "20px",
            backgroundColor: styles.darkgreen,
            cursor: "pointer",
            color: styles.light,
          }}
          onClick={() => setCurrentView("change-password")}
        >
          Change password
        </button>
      </div>
    </div>
  );
};

export default Profile;
