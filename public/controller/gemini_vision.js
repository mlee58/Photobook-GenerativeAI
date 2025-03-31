import { getFunctions, httpsCallable, connectFunctionsEmulator, } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-functions.js"

import { app } from "./firebase_core.js"

const functions = getFunctions(app);

//Connect to the local emulator if running.Verify the port #
connectFunctionsEmulator(functions, 'localhost', 5001);

const cloudFnGetImageDescription = httpsCallable(functions, 'cloudFnGetImageDescription');

export async function getImageDescription(imageURL) {
    try {
        const response = await cloudFnGetImageDescription(imageURL);
        console.log(response.data);
        return response.data
    } catch (e) {
        console.error('Error generating image description by Gemini', e);
        throw e;
    }
}