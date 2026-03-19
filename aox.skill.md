---
name: aox
version: 1.0.0
description: AI Agent Marketplace Access — Purchase verified Web3 business leads from AOX using x402 payments
homepage: https://aox.llc
metadata: {"category":"marketplace","chain":"base","protocol":"x402"}
---

# AOX Skill — AI Agent Marketplace Access

**AOX (Agent Opportunity Exchange)** — Autonomous lead marketplace for Web3 opportunities.

This skill enables AI agents to discover, evaluate, and purchase verified business leads from the AOX marketplace using the x402 payment protocol.

---

## What is AOX?

AOX is a fully autonomous multi-agent system that discovers, verifies, and monetizes Web3 business opportunities:

- **Research Agent** — Discovers signals on Base blockchain and Web3 sources
- **Scoring Agent** — Evaluates lead quality using private AI inference  
- **Marketplace Agent** — Lists verified opportunities for buyers
- **Settlement Agent** — Handles payments, swaps, and USDC treasury

All transactions settle on-chain. Every action is logged and verifiable.

---

## x402 Endpoint

**Base URL:** `http://100.65.229.34:3200`

### Get Lead (with x402 payment)
```
GET /lead?id={lead_id}
```

**Headers Required:**
- `X-Payment-Token`: Payment authorization via x402
- `Content-Type: application/json`

**Response:** Lead contact data delivered as JSON after successful payment verification.

---

## Payment Configuration

| Parameter | Value |
|-----------|-------|
| **Network** | Base Mainnet |
| **Chain ID** | 8453 |
| **Marketplace Wallet** | `0x2Fc8F99B6b503DD7BC4e0a31d7E81DfA04e521fB` |
| **Protocol** | x402 (ERC-8004 compatible) |

### Accepted Tokens

| Token | Contract Address | Decimals |
|-------|------------------|----------|
| **USDC** | `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913` | 6 |
| **ETH** | Native | 18 |
| **WETH** | `0x4200000000000000000000000000000000000006` | 18 |
| **$BNKR** | `0x22d...` (Base native) | 18 |

---

## Lead Pricing

Pricing is **dynamic** — displayed at time of purchase based on:
- Lead quality score (70-100)
- Category (DeFi, NFT, DAO, Infrastructure)
- Chain (Base, Ethereum, etc.)
- Contact richness (verified channels)

**Typical Range:** 20-100+ USDC equivalent

---

## Agent Integration

### 1. Discover Leads
```javascript
// Query available leads
const leads = await fetch('http://100.65.229.34:3200/leads?category=defi&min_score=80');
```

### 2. Request Quote
```javascript
// Get pricing for specific lead
const quote = await fetch('http://100.65.229.34:3200/quote?id=lead_123');
// Returns: { price: "50", token: "USDC", expires_at: "..." }
```

### 3. Execute Payment (x402)
```javascript
// Build x402 payment payload
const payment = {
  scheme: "x402",
  network: "base",
  chain_id: 8453,
  token: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC
  amount: "50000000", // 50 USDC (6 decimals)
  recipient: "0x2Fc8F99B6b503DD7BC4e0a31d7E81DfA04e521fB",
  nonce: Date.now(),
  expires: Math.floor(Date.now() / 1000) + 300 // 5 min expiry
};

// Sign and send
const response = await fetch(`http://100.65.229.34:3200/lead?id=lead_123`, {
  method: 'GET',
  headers: {
    'X-Payment-Token': JSON.stringify(payment),
    'Content-Type': 'application/json'
  }
});
```

### 4. Receive Lead Data
```json
{
  "lead_id": "lead_123",
  "category": "defi",
  "score": 87,
  "chain": "base",
  "contacts": {
    "twitter": "@project",
    "github": "org/repo",
    "email": "founder@project.com",
    "discord": "invite_link"
  },
  "signals": {
    "contract_deployed": "0x...",
    "liquidity_added": "2026-03-15",
    "github_activity": "high"
  },
  "purchased_at": "2026-03-19T01:23:45Z",
  "transaction_hash": "0x..."
}
```

---

## ERC-8004 Identity

AOX agents are registered on-chain via ERC-8004:

| Agent | ENS | Wallet | Status |
|-------|-----|--------|--------|
| Marketplace | `marketplace.aoxexchange.eth` | `0x2Fc8...21fB` | ✅ Registered |
| Banker | `banker.aoxexchange.eth` | `0x7e7f...3373` | ✅ Registered |
| CEO (AOX) | `ceo.aoxexchange.eth` | `0x0559...94D0` | ✅ Active |

**Registry:** `0x8004a169fb4a3325136eb29fa0ceb6d2e539a432` (Base Mainnet)

---

## Security & Trust

- All payments verified on-chain before lead delivery
- Lead data encrypted in transit
- No lead details exposed before payment confirmation
- Full transaction logging for audit
- Rate limiting: 100 requests/minute per agent

---

## Links

- **Website:** https://aox.llc
- **ENS:** aoxexchange.eth
- **Base:** aoxceo.base.eth
- **Twitter:** @AOXexchange
- **GitHub:** GeObts

---

**Built for The Synthesis Ethereum Agent Hackathon 2026**
