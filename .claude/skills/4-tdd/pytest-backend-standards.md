# Backend Testing Standards

**Applies only if this project has a backend.** Check CLAUDE.md's stack
declaration first — a frontend-only project should never need this file.

Generate Python backend tests using pytest and FastAPI's TestClient (swap
the framework specifics below if this project uses a different backend
stack — the structure/discipline is what's reusable, not the exact API).

## Rules
- Always use AAA structure with `# Arrange`, `# Act`, `# Assert` comments
- One assertion concept per test — don't stack unrelated assertions
- Test function names must describe the behavior: `test_<what>_<expected result>`
- Never test implementation details — test inputs and outputs only
- Each test must be independent — no test should rely on another test's side effects

## Setup Pattern
Every test file starts with:
```python
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)
```

## AAA Pattern
```python
def test_<behavior>():
    # Arrange
    <set up data and variables>

    # Act
    response = client.<method>(<url>, <optional json or params>)

    # Assert
    assert response.status_code == <expected>
    <additional assertions on response.json()>
```

## What to Test for Every Endpoint
- Happy path — valid input returns correct status and shape
- Validation error — missing or invalid input returns 422
- Not found — invalid ID returns 404
- Conflict — duplicate returns 409 (POST only)
- Required fields — response contains expected keys

## Status Codes
- 200 — successful GET
- 201 — successful POST (resource created)
- 204 — successful DELETE (no content returned)
- 404 — resource not found
- 409 — conflict (duplicate resource)
- 422 — validation error (bad input)
- 502 — external API error (a third-party dependency is down)

## Red-Green Validation (Required for Every New Test)

Before finalizing any new test, always verify it can fail:

1. Write the test
2. Temporarily flip the assertion to force failure:
```python
# Change this:
assert response.status_code == 201

# To this temporarily:
assert response.status_code == 999
```
3. Run pytest — confirm it FAILS (red)
4. Flip assertion back to correct value
5. Run pytest — confirm it PASSES (green)
6. Only then is the test considered valid

**Never accept a passing test that was never seen failing first.**

## Naming Conventions
- File: `tests/test_<feature>.py`
- Function: `test_<endpoint>_<scenario>()`
- Examples:
  - `test_save_item_returns_201()`
  - `test_save_duplicate_item_returns_409()`
  - `test_delete_nonexistent_item_returns_404()`
