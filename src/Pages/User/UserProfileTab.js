import BasicPage from "../../Components/BasicPage/BasicPage";
import React, {useState, useRef} from "react";
import { UploadButton } from "@bytescale/upload-widget-react";

// -----
// Configuration:
// https://www.bytescale.com/docs/upload-widget#configuration
// -----
const options = {
    apiKey: "public_W142iVK5rndoY5JSN5dftNzzrhmQ", // This is your API key.
    maxFileCount: 1
};

export default function UserProfileTab() {



    return (
        <BasicPage>
            <UploadButton options={options}
                          onComplete={files => alert(files.map(x => x.fileUrl).join("\n"))}>
                {({onClick}) =>
                    <button onClick={onClick}>
                        Upload a file...
                    </button>
                }
            </UploadButton>

        </BasicPage>
    );
}
