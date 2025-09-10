import ChangePicture from "@/components/Profile/ChangePicture";
import Title from "@/components/Title";

export default function PictureView() {
    return (
        <div className="flex flex-col space-y-5 md:border-l border-gray-200 lg:px-16 md:px-8 py-12 w-full">
            <Title text="Update your photo and attract the attention of recruiters">Photo profile</Title>
           <form noValidate className="space-y-8 p-5 bg-white rounded-md shadow border border-gray-200 max-w-7xl">
            <ChangePicture/>
           </form>
        </div>
    )
}
