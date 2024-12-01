//A function to get single order

async function getsingleOrder(req, res, next) {
  const {order_hash} = req.params;

  try {
    const singleOrder = await getsingleOrderr(order_hash);

    if (!singleOrder[0]?.order_id) {
      res.status(400).json({
        error: "Failed to get the Order!",
      });
    } else {
      res.status(200).json({
        status: "Order retrieved successfully! ",
        singleOrder: singleOrder,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      error: "Something went wrong!",
    });
  }
}
