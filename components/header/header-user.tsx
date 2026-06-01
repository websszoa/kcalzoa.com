import Image from "next/image";

const FACE_COUNT = 10;
const faceIndex = Math.floor(Math.random() * FACE_COUNT) + 1;
const faceSrc = `/face/face${String(faceIndex).padStart(2, "0")}.png`;

export default function HeaderUser() {
  return (
    <div className="p-4 border-b border-brand/5 bg-brand/5 mt-[-16px]">
      <div className="text-center py-2">
        <div className="flex justify-center mb-2">
          <div className="relative h-16 w-16 overflow-hidden rounded-full bg-gray-100">
            <Image
              src={faceSrc}
              alt="프로필 이미지"
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
        </div>
        <h3 className="font-paperlogy font-normal text-lg text-gray-900 mb-1">
          안녕하세요. 방가워요. 🤗
        </h3>
        <p className="font-anyvid text-sm text-muted-foreground truncate">
          다양한 칼로리 정보를 확인해보세요!
        </p>
      </div>
    </div>
  );
}
