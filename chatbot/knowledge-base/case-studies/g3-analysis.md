# G3 Pipeline Impact Analysis

## Category
Advanced Statistical Analysis & Causal Inference

## Overview

Rigorous statistical analysis to measure the causal impact of G3 (security specialist) engagements on customer security service adoption and revenue growth.

## Business Challenge

Measure the causal impact of G3 (security specialist) engagements on customer security service adoption and revenue growth. The key challenge was isolating the true program impact from selection bias—engaged customers may already be high-value accounts with natural growth trajectories.

## Solution Approach

Implemented advanced statistical matching and causal inference techniques to create valid counterfactual comparisons:

### Statistical Methodologies Used

1. **Propensity Score Matching (PSM)**
   - Matched treatment accounts to similar control accounts on 11 observable characteristics
   - Achieved 100% success rate with perfect covariate balance (all p-values > 0.05)

2. **Difference-in-Differences (DiD)**
   - Controlled for time trends and unobserved factors affecting both groups equally
   - Isolated true treatment effect from confounding variables

3. **Cluster-Based Control Groups**
   - K-means clustering with 11 features
   - Identified heterogeneous treatment effects across account types

4. **Bootstrap Confidence Intervals**
   - 10,000 iterations to quantify uncertainty in estimates
   - Provided robust confidence intervals for business decision-making

## Results & Impact

### Key Metrics

- **$706K Annual Revenue** with 6:1 ROI validation
- **219.8% ARR Lift** ($219,942 additional ARR per engaged account)
- **19% Security Revenue Increase** with statistical significance (p < 0.05)
- **1,220 New Customer Adoptions** exceeding annual target by 4 months
- **68.7% Win Rate** for direct engagements
- **100% PSM Success Rate** achieving perfect matching

### Data Scale

- 638,178 customer-month observations across 53,367 unique customers
- 30,567 opportunity records across 2,719 accounts
- 25 different engagement types analyzed
- 12-month observation period for revenue tracking
- 235 G3 engaged accounts with complete data

## Business Impact

This analysis directly influenced:
- **2026 Goal Setting:** 750 G3 engagements target with 70% win rate
- **Resource Allocation:** Focus on high-performing engagement types
- **Program Expansion:** $17M+ investment justified
- **Field Strategy:** Engagement playbooks optimized by cluster and type

## Tools & Technologies

- Python (pandas, numpy, scipy, scikit-learn)
- Statistical modeling (statsmodels)
- PostgreSQL
- AWS Secrets Manager

