# Test the waitlist system with the following commands:

# 1. Clear any existing test entries:
curl -X POST http://localhost:3000/api/waitlist-test/clear

# 2. Add new test entries (adjust count and tier as needed):
curl -X POST http://localhost:3000/api/waitlist-test -H "Content-Type: application/json" -d '{"count": 10, "tier": "founding"}'

# 3. Check the DynamoDB tables directly:
curl http://localhost:3000/api/waitlist-table-check

# 4. Check debug information:
curl http://localhost:3000/api/waitlist-debug

# 5. Check direct data access:
curl http://localhost:3000/api/waitlist-test/direct

# 6. Check waitlist stats with direct DB access (should work):
curl http://localhost:3000/api/waitlist-stats/force-correct-table

# 7. Check waitlist stats with updated hybrid approach (should also work):
curl http://localhost:3000/api/waitlist-stats
