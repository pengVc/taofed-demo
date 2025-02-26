
/*
 * ```Python```

async def slow_operation():
    await asyncio.sleep(3600)

async def main():
    try:
        await asyncio.wait_for(slow_operation(), timeout=1.0)
    except asyncio.TimeoutError:
        print("Timeout!")
 */

const slowOperation = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3600 * 1000));
};

const main = async () => {
  try {
    await Promise.race([
      slowOperation(),
      new Promise((resolve, reject) => setTimeout(reject, 1000))
    ]);
  } catch (e) {
    console.log("Timeout!");
  }
}

main()
