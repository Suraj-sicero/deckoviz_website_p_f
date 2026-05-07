import re

file_path = "/home/shashank/Documents/work2/deckoviz-demo/deckoviz_web-main/src/components/payment/OrderConfirmed.tsx"
with open(file_path, "r") as f:
    content = f.read()

# Fix the port
content = content.replace("http://localhost:4242/order-details", "http://localhost:5000/order-details")

# Add fulfill credits call
new_fetch = """fetch(`http://localhost:5000/order-details?session_id=${sessionId}`)
        .then(res => {
          if (!res.ok) {
            throw new Error('Could not fetch order details.');
          }
          return res.json();
        })
        .then((data: OrderData) => {
          setOrderData(data);
          setIsLoading(false);
          // Try to fulfill credits if it was a credit purchase
          fetch(`http://localhost:5000/fulfill-credits`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ session_id: sessionId })
          }).catch(console.error);
        })"""

old_fetch_regex = r"fetch\(`http://localhost:5000/order-details\?session_id=\$\{sessionId\}`\).*?\.then\(\(data: OrderData\) => {\n          setOrderData\(data\);\n          setIsLoading\(false\);\n        }\)"

content = re.sub(old_fetch_regex, new_fetch, content, flags=re.DOTALL)

with open(file_path, "w") as f:
    f.write(content)

