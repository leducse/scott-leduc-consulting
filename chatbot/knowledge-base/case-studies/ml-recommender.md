# ML Engagement Recommender

## Category
Machine Learning & Predictive Analytics

## Overview

Built a machine learning recommendation engine to optimize SA engagement strategies by predicting which customer engagement approaches will be most successful based on historical patterns.

## Business Challenge

Optimize SA engagement strategies by predicting which customer engagement approaches will be most successful. Replace intuition-based engagement decisions with data-driven recommendations to improve conversion rates and reduce wasted efforts.

## Solution Approach

Built ML recommendation engine using ensemble methods with comprehensive feature engineering:

### Machine Learning Pipeline

1. **Feature Engineering**
   - Created 50+ engineered features from raw engagement data
   - Features included engagement history, account characteristics, and temporal features

2. **Model Training**
   - Trained multiple models: Random Forest, XGBoost, and Logistic Regression
   - 5-fold cross-validation for robust evaluation
   - Hyperparameter tuning for optimization

3. **PCA Analysis**
   - Principal Component Analysis for dimensionality reduction
   - Pattern identification across engagement dimensions

4. **Model Interpretability**
   - SHAP values for feature importance analysis
   - Transparent decision-making for stakeholders

## Results & Impact

### Key Metrics

- **53% Conversion Rate Improvement** through predictive targeting
- **89.1% Model Accuracy** with XGBoost (best performer)
- **87.3% Model Accuracy** with Random Forest
- **82.7% Model Accuracy** with Logistic Regression
- **15-20% Win Rate Improvement** in engagement success rates
- **30% Reduction** in misallocated engagement efforts
- **$500K+ Annual Impact** through optimized strategies

### Feature Importance (Top 5)

1. Previous Engagement Success Rate (0.23 importance)
2. Account Adoption Score (0.18 importance)
3. Industry Vertical (0.15 importance)
4. Account Size (0.12 importance)
5. Time Since Last Engagement (0.09 importance)

## Business Impact

Replaced intuition-based approaches with statistical models, enabling data-driven engagement decisions and significantly improving conversion rates.

## Tools & Technologies

- Python (scikit-learn, XGBoost, TensorFlow)
- Amazon SageMaker
- PCA Analysis
- Feature Engineering pipelines


