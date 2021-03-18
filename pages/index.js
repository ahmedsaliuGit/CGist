import Head from "next/head";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";

import { Card, Button, ListGroup } from "react-bootstrap";

export default function Home({ posts }) {
  const DefaultPhoto = "/images/fruit.jpeg";
  return (
    <Layout>
      <Head>
        <title>Community Gist: Home</title>
      </Head>
      <section className={styles.sectionMain}>
        <img
          className={`${styles.banner}`}
          src="/images/home-banner.jpg"
          alt="Home page banner"
        />

        <h3 className={styles.sectionCPostTitle}>Recent Community Posts</h3>
        <section className={styles.sectionCPost}>
          {posts.map((post) => {
            const posterName = post.postedBy ? post.postedBy.name : " Unknown";

            return (
              <article className={styles.articlePost} key={post._id}>
                <Card>
                  <Card.Img variant="top" src={DefaultPhoto} alt={post.name} />
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.body}</Card.Text>
                    <Button variant="primary">Read more</Button>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">
                      Posted by {posterName} on{" "}
                      {new Date(post.created).toDateString()}
                    </small>
                  </Card.Footer>
                </Card>
              </article>
            );
          })}
        </section>
        <h3 className={styles.sectionCPostTitle}>Up Coming Events</h3>
        <section className={styles.sectionCPost}>
          <ListGroup style={{ width: "100%" }}>
            <ListGroup.Item variant="secondary">
              <div className={styles.upEventListHeader}>
                <span>Name</span>
                <span>Start Date</span>
                <span>End Date</span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item variant="primary">
              <div className={styles.upEventListRow}>
                <span>General Meeting</span>
                <span>30, March 2021</span>
                <span>30, March 2021</span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item variant="info">
              <div className={styles.upEventListRow}>
                <span>Committe Excos Meeting</span>
                <span>07, April 2021</span>
                <span>07, April 2021</span>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </section>
      </section>
    </Layout>
  );
}

export async function getStaticProps(context) {
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

  return {
    props: {
      posts,
    }, // will be passed to the page component as props
  };
}
