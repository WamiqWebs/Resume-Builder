"use client"
import { useState } from "react"
import toast from "react-hot-toast";
interface FormDataType {
    name: string;
    email: string;
    password: string;
    message: string;
}
export default function ContactUsForm() {
    const fields = [
        { name: "name", type: "text", placeholder: "Name...", autoComplete: "name" },
        { name: "email", type: "email", placeholder: "Email...", autoComplete: "email"},
        { name: "password", type: "password", placeholder: "Password...", autoComplete: "new-password" },
    ];

    const [formData, setFormData] = useState<FormDataType>({
        name: "",
        email: "",
        password: "",
        message: "",
    });
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        if (!formData.name || !formData.email || !formData.password || !formData.message) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            const res = await fetch("/api/contact-us-form", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json(); // JSON parse

            if (res.ok) {
                toast.success(data.message);
                setFormData({ name: "", email: "", password: "", message: "" });
            } else {
                toast.error(data.message || "Server error");
            }
        } catch (error) {
            console.error(error);
            toast.error("An unexpected error occurred");
        }
    };
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev, [name]: value,
        }));
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded py-5 mt-5 w-[80%] sm:w-[40%] flex flex-col items-center"
            >
                <p className="text-black mb-3">Please fill all the fields</p>
                {fields.map((field) => (
                    <input
                        key={field.name}
                        name={field.name}
                        type={field.type}
                        value={formData[field.name as keyof FormDataType]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className="bg-gray-200 rounded w-[80%] p-2 mb-3"
                    />
                ))}

                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="p-2 w-[80%] rounded bg-gray-200 mb-3"
                    placeholder="Message Here..."
                    autoComplete="off"
                />

                <button className="bg-teal-400 hover:bg-lime-500 text-white px-4 py-2 rounded">
                    Submit
                </button>
            </form>
        </>
    )
}