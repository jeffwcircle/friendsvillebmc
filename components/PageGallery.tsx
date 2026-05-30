"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Photo {
  id: number;
  image_url: string;
  title: string;
}

export default function PageGallery({
  pageName,
}: {
  pageName: string;
}) {
  const [photos, setPhotos] =
    useState<Photo[]>([]);

  useEffect(() => {
    async function loadPhotos() {
      const { data } =
        await supabase
          .from(
            "gallery_photos"
          )
          .select("*")
          .eq(
            "page_name",
            pageName
          )
          .eq(
            "is_visible",
            true
          )
          .order(
            "display_order",
            {
              ascending: true,
            }
          );

      setPhotos(data || []);
    }

    loadPhotos();
  }, [pageName]);

  return (
    <div className="photo-gallery">
      {photos.map((photo) => (
        <img
          key={photo.id}
          src={photo.image_url}
          alt={photo.title}
        />
      ))}
    </div>
  );
}