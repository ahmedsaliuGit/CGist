import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import styles from "../../styles/PostById.module.css";

export default function Post({ post }) {
  const posterName = post.postedBy ? post.postedBy.name : " Unknown";
  const DefaultPhoto = "/images/home-banner.jpg";

  return (
    <Layout>
      <Head>
        <title>Community Gist: {post.title}</title>
      </Head>
      <section className={styles.sectionPostByIdMain}>
        <Link href="/">
          <a>
            <p>Go Back</p>
          </a>
        </Link>
        <img
          className={`${styles.banner}`}
          src={DefaultPhoto}
          alt={post.title}
        />
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <div className={styles.postByIdPostedBy}>
          <small className="text-muted">
            Posted by {posterName} on {new Date(post.created).toDateString()}
          </small>
          <span>Like Unlike</span>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(
    process.env.APP_API_URL + "/api/posts?perPage=6&page=1",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  const posts = await res.json();

  const paths = posts.map((post) => ({
    params: { id: post._id },
  }));

  return {
    paths, // See the "paths" section below

    fallback: true, // See the "fallback" section below
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const res = await fetch(process.env.APP_API_URL + "/api/post/" + id, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const post = await res.json();

  console.log(post, `${process.env.APP_API_URL}/post/photo/${post._id}`);
  return {
    props: {
      post,
    }, // will be passed to the page component as props
  };
}
