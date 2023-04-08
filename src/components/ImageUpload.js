import React, { useState } from 'react'
import axios from 'axios'

const ImageUpload = ({ onUploadSucces }) => {
	const [selectedFile, setSelectedFile] = useState()
	const [isSelected, setIsSelected] = useState(false)
	const [isUploading, setIsUploading] = useState(false)

	function handleInputChange(event) {
		setSelectedFile(event.target.files[0])
		setIsSelected(true)
	}

	async function submit() {
		setIsUploading(true)
		const formData = new FormData()

		formData.append('file', selectedFile)
		formData.append('sub_id', `${process.env.REACT_APP_SUB_ID}`)

		try {
			await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/images/upload?sub_id=${process.env.REACT_APP_SUB_ID}`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						'x-api-key': `${process.env.REACT_APP_API_KEY}`,
					},
				}
			)

			onUploadSucces()
		} catch (error) {
			// Handle errors
			throw error
		} finally {
			setIsUploading(false)
			setIsSelected(false)
		}
	}

	if (isUploading) {
		return <div>Is uploading..</div>
	}

	if (!isUploading) {
		return (
			<div>
				<label className="text-white">Select File :</label>
				<input
					type="file"
					name="upload_file"
					onChange={handleInputChange}
					accept="image/png, image/jpeg"
				/>
				<button
					disabled={!isSelected}
					type="submit"
					onClick={() => submit()}
				>
					Save
				</button>
			</div>
		)
	}
}

export default ImageUpload
