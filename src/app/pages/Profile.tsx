import {
  Avatar,
  Label,
  Input,
  Card,
  CardHeader,
  Title2,
  CardFooter,
  Button,
  Spinner,
} from "@fluentui/react-components";
import { useState, createRef } from "react";
import useLogin from "src/app/pages/auth/hooks/useLogin";
import toast from "react-hot-toast";

export default function Profile() {
  const { getUserQuery, updateProfileMutation } = useLogin();

  const [selectedAvatar, setSelectedAvatar] = useState(
    getUserQuery.data?.avatar
  );
  const [avatarPreview, setAvatarPreview] = useState(getUserQuery.data?.avatar);
  const [name, setName] = useState(getUserQuery.data?.name);
  const [gymName, setGymName] = useState(getUserQuery.data?.gymName);

  const fileInputRef: any = createRef();

  const handleFileChange = (event: any) => {
    console.log("HELLLOO");
    const file = event.target.files[0];
    setSelectedAvatar(file);
    previewImage(file);
    console.log("avatar", file);
  };

  const previewImage = (file: any) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as any);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = (e: any) => {
    e.preventDefault();
    if (!name && !gymName && !selectedAvatar) {
      toast.error("You need to update at least one field!");
      return;
    }

    let data = {};
    if (selectedAvatar) {
      data = { ...data, avatar: selectedAvatar };
    }
    if (name) {
      data = { ...data, name };
    }
    if (gymName) {
      data = { ...data, gymName };
    }
    updateProfileMutation.mutate({ ...data });
  };

  return (
    <div style={{ maxWidth: "500px", margin: "16px auto" }}>
      {updateProfileMutation.isPending ? (
        <Spinner label="Updating profile..." />
      ) : (
        <Card>
          <CardHeader header={<Title2>Profile settings</Title2>}></CardHeader>

          <form
            onSubmit={handleProfileUpdate}
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div>
              <Avatar
                name={getUserQuery.data?.name}
                size={96}
                image={{
                  src: avatarPreview as any,
                }}
              />
              <Button
                style={{ marginLeft: "12px" }}
                onClick={() => fileInputRef.current.click()}
              >
                Change your profile picture
              </Button>
              <input
                type="file"
                onChange={handleFileChange}
                hidden
                ref={fileInputRef}
                accept="image/*"
              />
            </div>
            <Label htmlFor="name">Your new name</Label>
            <Input
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <Label htmlFor="gymName">Your new gym name</Label>
            <Input
              id="gymName"
              onChange={(e) => setGymName(e.target.value)}
              value={gymName}
            />
            <CardFooter>
              <Button disabled={updateProfileMutation.isPending} type="submit">
                Save
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}
    </div>
  );
}
