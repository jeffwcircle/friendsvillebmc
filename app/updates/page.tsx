"use client";

import FacebookPost from "@/components/FacebookPost";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface FacebookPost {
  id: number;
  title : string | null;
  post_url: string;
  created_at: string;
}

export default function UpdatesPage() {
  const [posts, setPosts] = useState<FacebookPost[]>([]);

  async function loadPosts() {
    const { data, error } = await supabase
      .from("facebook_posts")
      .select("*")
      .eq("is_visible", true)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(error);
      return;
    }

    setPosts(data || []);
  }

  useEffect(() => {
    loadPosts();
  }, []);

return (
  <div className="page-wrapper">

    <div className="top-bar">
      <div className="site-title">
        <h1>Friendsville Bible Methodist Church</h1>
        <p>Friendsville, Tennessee</p>
      </div>

      <nav>
        <a href="/">Home</a>
        <a href="/pastor">Pastor&apos;s Page</a>
        <a href="/visit">Visit Us</a>
        <a href="/updates">Updates</a>
      </nav>
    </div>

    <div className="container">

      <div className="layout">

        <div className="left-column">

          <div className="card">
            <h1>Church Updates</h1>

            <p>
              Stay connected with the latest news,
              announcements, and updates from
              Friendsville Bible Methodist Church.
            </p>
          </div>

          {posts.map((post) => (
            <div
              key={post.id}
              className="card"
            >
              {post.title && (
                <h2>{post.title}</h2>
              )}

              <small>
                Posted{" "}
                {new Date(
                  post.created_at
                ).toLocaleDateString()}
              </small>

              <br />
              <br />

              <FacebookPost
                url={post.post_url}
              />
            </div>
          ))}

        </div>

          <div className="right-column">

            <div className="card">

              <center>

                <img
                  className="pastor-photo"
                  src="/pastor-family.jpg"
                  alt="Pastor Dana Bentz"
                />

                <hr />

                <h3>Schedule of Services</h3>

                <b>Sunday Morning Worship</b> 11:00 AM

                <br />
                <br />

                <b>Sunday Evening Service</b> 6:00 PM

                <br />

                <hr />

                <h3>Visit Us</h3>

                108 E First Ave
                <br />

                Friendsville, TN 37737

                <br />

                Phone: (865) 850-9539

                <br />

                Email: pastorbentz@yahoo.com

              </center>

            </div>

          </div>

        </div>

      </div>

    <div className="footer">
      Friendsville Bible Methodist Church
    </div>

  </div>
);}