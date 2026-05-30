export default function FacebookPost({
  url,
}: {
  url: string;
}) {
  const embedUrl =
    "https://www.facebook.com/plugins/post.php?href=" +
    encodeURIComponent(url) +
    "&show_text=true";

  return (
    <iframe
      src={embedUrl}
      width="100%"
      height="700"
      style={{
        border: "none",
        overflow: "hidden",
      }}
      scrolling="no"
      allow="encrypted-media"
    />
  );
}