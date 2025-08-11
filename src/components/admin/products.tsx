"use client";

import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

const updateImage = () => {
  const [image, setImage] = useState<any>();
  const [selectedImage, setSelectedImage] = useState<File>()
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    fetch(`http://localhost:3000/api/image/${params.id}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Response was not ok.");
        }

        return response.json();
      })
      .then((data) => setImage(data));
  }, []);

  console.log("image: ", image);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedImage(e.target.files[0]);
    }
  };

const handleUpdate = async () => {
  if (!selectedImage) {
    alert("Please select an image.");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("image", selectedImage);

    const response = await fetch(`http://localhost:3000/api/image/${params.id}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const result = await response.json();
    alert("Image updated successfully.");
    router.push("/");
    router.refresh(); 
  } catch (error) {
    console.error("Update failed:", error);
    alert(`Update failed: ${error instanceof Error ? error.message : String(error)}`);
  }
};

  return (
    <div>
      <img
        src={image?.image_url}
        className="w-72 h-72 object-cover object-center"
      />

      <div className="w-full">
        <input type="file" accept="image/*" onChange={handleChange} />
      </div>

      <button
        onClick={handleUpdate}
        className="mt-4 bg-black text-white p-2 font-semibold rounded-md hover:bg-gray-600 text-sm"
      >
        Update Image
      </button>
    </div>
  );
};

export default updateImage;
