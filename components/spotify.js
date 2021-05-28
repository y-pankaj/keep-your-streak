import React from "react";

export default function Spotify() {
  return (
    <div className="hidden md:block lg:absolute lg:top-20 lg:right-5">
      <iframe
        src="https://open.spotify.com/embed/playlist/75hjJpI57mfzPhdMC3X3IJ"
        width="300"
        height="380"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
      ></iframe>
    </div>
  );
}
