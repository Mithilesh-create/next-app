import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head"
function index(props) {
  return (
    <>
      <Head>
        <title>Welcome MeetUp</title>
        <meta name="description" content="This is a description"/>
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}
// export async function getServerSideProps(context) {
//   const res = context.res;
//   const req = context.req;
//   return {
//     props: {
//       meetups: DummyData,
//     },
//   };
// }
export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://admin:UgYBJClx74QzJx0q@cluster0.3tpra.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
  const db = await client.db();
  const MongoCollection = db.collection("meetups");
  const data = await MongoCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: data.map((e) => ({
        title: e.title,
        address: e.address,
        image: e.image,
        id: e._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
export default index;
