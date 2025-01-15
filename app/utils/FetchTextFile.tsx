export default async function fetchTextFile(path: string) {
    const response = await fetch(path);
    if (response.ok) {
        const text = await response.text();
        return text;
    } else {
        throw new Error("Failed to fetch the text file");
    }
}