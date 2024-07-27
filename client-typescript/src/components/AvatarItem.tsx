import { Avatar, AvatarImage } from "@/components/ui/avatar";
import userImg from '@/assets/img/user.jfif'

export function AvatarItem({ avatar }) {
  return (
    <Avatar>
      <AvatarImage
        src={avatar ? avatar : userImg}
        alt="avatar-image"
        loading="lazy"
      />
    </Avatar>
  );
}
