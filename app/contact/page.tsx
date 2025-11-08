import ContactButton from "./button";

export default function Contact() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold mb-4">Contact Page</h1>
            <p className="text-lg mb-8">Feel free to reach out to us!</p>
            <ContactButton />
        </div>
    );
}