import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import Head from "next/head"

function index() {
  const handleFormData = async (data) => {
    try {
      const res = await fetch("/api/new-meetup", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await res.json();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
    <Head>
        <title>Add new Meetup</title>
        <meta name="description" content="This is a description"/>
      </Head>
      <NewMeetupForm onAddMeetup={handleFormData} />
    </>
  );
}

export default index;
