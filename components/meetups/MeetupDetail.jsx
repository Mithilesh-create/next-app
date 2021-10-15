import classes from "./MeetupDetail.module.css"
function MeetupDetail(props) {
  return (
    <section className={classes.details}>
      <img src={props.src} alt={props.id} />
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <span>This is a Detail Area</span>
    </section>
  );
}

export default MeetupDetail;
