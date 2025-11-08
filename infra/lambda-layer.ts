const bucket = new sst.aws.Bucket("MyLambdaLayers", { public: false });

// const [x64Layer, arm64Layer] = ["x86_64", "arm64"]
const [x64Layer] = ["x86_64"].map((arch) => {
	const layerName = `bun-${arch}-layer`;
	const key = `${layerName}.zip`;

	const layerObject = new aws.s3.BucketObjectv2(layerName, {
		bucket: bucket.name,
		key: key,
		contentType: "application/zip",
		source: $asset(`infra/${key}`),
	});

	const layer = new aws.lambda.LayerVersion(layerName, {
		layerName: layerName,
		description: `My Bun ${key} Lambda Layer published with Pulumi`,
		s3Bucket: bucket.name,
		s3Key: layerObject.key,
		compatibleRuntimes: ["provided.al2023"],
		compatibleArchitectures: [arch],
	});

	const layerVersion = Number(layer.version) || 1;

	new aws.lambda.LayerVersionPermission(`${key}-public-permission`, {
		layerName: layer.layerName,
		versionNumber: layerVersion,
		action: "lambda:GetLayerVersion",
		principal: "*",
		statementId: $interpolate`public-access-${layerVersion}`,
	});

	return layer;
});

export const x64LayerArn = x64Layer.arn;
// export const arm64LayerArn = arm64Layer.arn;
