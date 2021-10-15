import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient,ObjectId } from "mongodb";
import Head from "next/head"

function index(props) {
  return (
    <>
    <Head>
        <title>{props.meetups.title}</title>
        <meta name="description" content={props.meetups.description} />
      </Head>
      <MeetupDetail
        src={props.meetups.src}
        id={props.meetups.id}
        address={props.meetups.address}
        title={props.meetups.title}
      />
    </>
  );
}
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://admin:UgYBJClx74QzJx0q@cluster0.3tpra.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
  const db = await client.db();
  const MongoCollection = db.collection("meetups");
  const data = await MongoCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: false,
    paths: data.map((item) => ({
      params: {
        meetupId: item._id.toString(),
      },
    })),
    // [
    //   {
    //     params: {
    //       meetupId: "first",
    //     },
    //   },
    //   {
    //     params: {
    //       meetupId: "second",
    //     },
    //   },
    // ],
  };
}
export async function getStaticProps(context) {
  const meetid = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://admin:UgYBJClx74QzJx0q@cluster0.3tpra.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
  const db = await client.db();
  const MongoCollection = db.collection("meetups");
  const data = await MongoCollection.findOne({ _id: ObjectId(meetid) });
  return {
    props: {
      meetups: {
        src:data.image,
        address:data.address,
        title:data.title,
        description:data.description,
        id:data._id.toString(),
      },
    },
  };
}
export default index;
