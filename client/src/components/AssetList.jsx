const AssetList = ({ assets }) => {
  return (
    <div>
      <h3>Assets</h3>
      {assets.map((asset) => (
        <div key={asset.id}>
          <p><b>{asset.name}</b></p>
          <p>Category: {asset.category}</p>
          <p>Location: {asset.location}</p>
          <p>Available: {asset.availableQuantity}/{asset.totalQuantity}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default AssetList;