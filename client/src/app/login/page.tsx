import FormComponent from "./_component/_form.component";

export default function Login() {
  return (
    <div className="relative h-screen flex items-center justify-center text-white overflow-hidden">
      <video
        autoPlay
        muted
        loop
        id="background-video"
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/video/2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative z-10 bg-black bg-opacity-50 w-screen h-screen rounded-lg shadow-lg">
        <FormComponent />
      </div>
    </div>
  );
}
