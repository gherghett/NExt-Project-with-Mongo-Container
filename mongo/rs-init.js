// Auto-init replica set on first startup
const host = (process.env.MONGO_RS_HOST || "localhost:27017").trim();

try {
  rs.initiate({
    _id: "rs0",
    members: [{ _id: 0, host }]
  });
  print(`✅ Replica set rs0 initiated with ${host}`);
} catch (e) {
  print(`ℹ️ rs.initiate skipped: ${e}`);
}
