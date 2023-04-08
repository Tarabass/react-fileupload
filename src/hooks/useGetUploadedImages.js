import { useState, useCallback } from 'react'
import axios from 'axios'

const useGetUploadedImages = () => {
	const [uploadedImages, setUploadedImages] = useState([])
	const [loading, setLoadingState] = useState(true)

	const refetch = useCallback(() => {
		const fetchData = async () => {
			setLoadingState(true)
			const url = `${process.env.REACT_APP_API_ENDPOINT}/images`
			const apiKey = `${process.env.REACT_APP_API_KEY}`
			const subId = `${process.env.REACT_APP_SUB_ID}`

			try {
				const res = await axios.get(`${url}`, {
					headers: {
						'Content-Type': 'application/json',
						'x-api-key': apiKey,
					},
					params: {
						limit: 10,
						sub_id: `${subId}`,
					},
				})

				setUploadedImages(res.data || [])
			} catch (error) {
				// Handle errors
				throw error
			} finally {
				setLoadingState(false)
			}
		}

		fetchData()
	}, [])

	return [
		{
			uploadedImages,
			loading,
		},
		refetch,
	]
}

export default useGetUploadedImages
