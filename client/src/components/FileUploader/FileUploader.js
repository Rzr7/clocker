import React, { Component } from 'react';
import { uploadFile } from 'util/APIUtils';

export class FileUploader extends Component {
    constructor() {
        super();
    }

    

    render() {
        return (
            <div>
                <input type="file" onChange={this.handleUploadFile} />
            </div>
        )
    };
}