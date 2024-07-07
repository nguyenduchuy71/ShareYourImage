import { Avatar, AvatarImage } from "@/components/ui/avatar";

export function AvatarItem({ avatar }) {
  return (
    <Avatar>
      <AvatarImage
        src={avatar ? avatar : "https://github.com/shadcn.png"}
        alt="avatar-image"
        loading="lazy"
      />
    </Avatar>
  );
}
