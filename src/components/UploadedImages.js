const UploadedImages = ({ images, isLoading }) => {
	if (isLoading) {
		return <div>Fetching images..</div>
	}

	if (!isLoading) {
		return (
			<div>
				{images.map((image) => (
					<img
						key={image.id}
						alt=""
						width="10%"
						height="10%"
						src={image.url}
					/>
				))}
			</div>
		)
	}
}

export default UploadedImages
