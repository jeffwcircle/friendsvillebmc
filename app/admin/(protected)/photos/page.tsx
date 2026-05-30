"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Photo {
  id: number;
  title: string;
  image_url: string;
  page_name: string;
  is_visible: boolean;
}

const PAGE_OPTIONS = [
  "pastor",
  "home",
  "updates",
  "gallery",
];

export default function PhotosPage() {
  const [title, setTitle] = useState("");
  const [pageName, setPageName] = useState("pastor");
  const [file, setFile] = useState<File | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);

  async function loadPhotos() {
    const { data } = await supabase
      .from("gallery_photos")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    setPhotos(data || []);
  }

  async function uploadPhoto() {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const fileName =
      Date.now() + "-" + file.name;

    const { error: uploadError } =
      await supabase.storage
        .from("church-photos")
        .upload(fileName, file);

    if (uploadError) {
      alert(uploadError.message);
      console.log(uploadError);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("church-photos")
      .getPublicUrl(fileName);

    const { error } = await supabase
      .from("gallery_photos")
      .insert([
        {
          title,
          image_url: publicUrl,
          page_name: pageName,
          is_visible: true,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    setTitle("");
    setFile(null);

    loadPhotos();
  }

  async function toggleVisible(
    id: number,
    visible: boolean
  ) {
    await supabase
      .from("gallery_photos")
      .update({
        is_visible: !visible,
      })
      .eq("id", id);

    loadPhotos();
  }

  async function deletePhoto(id: number) {
    if (
      !confirm(
        "Delete this photo?"
      )
    )
      return;

    await supabase
      .from("gallery_photos")
      .delete()
      .eq("id", id);

    loadPhotos();
  }

  useEffect(() => {
    loadPhotos();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Manage Photos</h1>

      <div
        style={{
          marginBottom: "2rem",
        }}
      >
        <input
          type="text"
          placeholder="Photo Title"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
        />

        <br />
        <br />

        <select
          value={pageName}
          onChange={(e) =>
            setPageName(
              e.target.value
            )
          }
        >
          {PAGE_OPTIONS.map(
            (page) => (
              <option
                key={page}
                value={page}
              >
                {page}
              </option>
            )
          )}
        </select>

        <br />
        <br />

        <input
          type="file"
          onChange={(e) =>
            setFile(
              e.target.files?.[0] ||
                null
            )
          }
        />

        <br />
        <br />

        <button
          onClick={uploadPhoto}
        >
          Upload Photo
        </button>
      </div>

      <hr />

<div className="admin-photo-grid">
  {photos.map((photo) => (
    <div
      key={photo.id}
      className="admin-photo-card"
    >
      <img
        src={photo.image_url}
        alt={photo.title}
      />

      <h4>{photo.title}</h4>

      <p>
        Page: {photo.page_name}
      </p>

      <p>
        Visible: {photo.is_visible ? "Yes" : "No"}
      </p>

      <button
        onClick={() =>
          toggleVisible(
            photo.id,
            photo.is_visible
          )
        }
      >
        {photo.is_visible
          ? "Hide"
          : "Show"}
      </button>

      <button
        onClick={() =>
          deletePhoto(photo.id)
        }
        style={{
          marginLeft: "10px",
        }}
      >
        Delete
      </button>
    </div>
  ))}
</div>    </div>
  );
}