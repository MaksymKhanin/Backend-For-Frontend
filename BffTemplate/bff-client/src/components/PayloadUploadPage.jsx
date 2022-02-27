import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function PayloadUploadPage() {
	const { register, handleSubmit } = useForm();

	const onSubmit = (data) => {
		const formData = new FormData();
		formData.append("payload", data["payload"][0]);

		axios
			.post("api/validation", formData, {
				headers: { CustomHeaderToProtectFromXCSRF: "true" },
			})
			.then((response) => {
				toast.success("Payload uploaded.");
			})
			.catch((error) => {});
	};

	return (
		<div className="App">
			<form onSubmit={handleSubmit(onSubmit)}>
				<input {...register("payload")} type="file" />
				<button>Submit</button>
			</form>
		</div>
	);
}

export default PayloadUploadPage;
