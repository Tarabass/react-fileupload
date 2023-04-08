import React, { useEffect } from 'react'
import useGetUploadedImages from './hooks/useGetUploadedImages'
import ImageUpload from './components/ImageUpload'
import UploadedImages from './components/UploadedImages'

function App() {
	const [{ uploadedImages, loading  }, refetch] = useGetUploadedImages()

	useEffect(() => {
		refetch()
	}, [refetch])

	return (
		<>
			<h2>React File Upload</h2>
			<ImageUpload onUploadSucces={refetch} />
			<UploadedImages images={uploadedImages} isLoading={loading} />
		</>
	)
}

export default App
