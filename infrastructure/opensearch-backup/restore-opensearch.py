#!/usr/bin/env python3
"""
Restore OpenSearch Serverless collection for Knowledge Base.

This script recreates the OpenSearch Serverless infrastructure that was 
deleted to save costs. Run this if you need to re-enable semantic search
for the chatbot Knowledge Base.

Usage:
    python restore-opensearch.py

Prerequisites:
    - AWS CLI configured with appropriate permissions
    - boto3 installed (pip install boto3)

Estimated time: 5-10 minutes for collection to become ACTIVE
Estimated cost: ~$175/month (2 OCUs minimum)
"""

import boto3
import json
import time

REGION = "us-east-1"
COLLECTION_NAME = "scottleduc-kb"
ACCOUNT_ID = "441383083571"

def main():
    client = boto3.client('opensearchserverless', region_name=REGION)
    
    print("🔧 Restoring OpenSearch Serverless for Knowledge Base...")
    print(f"   Collection: {COLLECTION_NAME}")
    print(f"   Region: {REGION}")
    print()
    
    # Step 1: Create encryption policy
    print("1️⃣ Creating encryption policy...")
    try:
        client.create_security_policy(
            name=f"{COLLECTION_NAME}-encryption",
            type="encryption",
            policy=json.dumps({
                "Rules": [{"Resource": [f"collection/{COLLECTION_NAME}"], "ResourceType": "collection"}],
                "AWSOwnedKey": True
            })
        )
        print("   ✓ Encryption policy created")
    except client.exceptions.ConflictException:
        print("   ⚠ Encryption policy already exists")
    
    # Step 2: Create network policy
    print("2️⃣ Creating network policy...")
    try:
        client.create_security_policy(
            name=f"{COLLECTION_NAME}-network",
            type="network",
            policy=json.dumps([{
                "Rules": [
                    {"Resource": [f"collection/{COLLECTION_NAME}"], "ResourceType": "collection"},
                    {"Resource": [f"collection/{COLLECTION_NAME}"], "ResourceType": "dashboard"}
                ],
                "AllowFromPublic": True
            }])
        )
        print("   ✓ Network policy created")
    except client.exceptions.ConflictException:
        print("   ⚠ Network policy already exists")
    
    # Step 3: Create collection
    print("3️⃣ Creating collection...")
    try:
        response = client.create_collection(
            name=COLLECTION_NAME,
            type="VECTORSEARCH",
            description="Vector store for Scott LeDuc consulting website Knowledge Base"
        )
        collection_id = response['createCollectionDetail']['id']
        print(f"   ✓ Collection created: {collection_id}")
    except client.exceptions.ConflictException:
        print("   ⚠ Collection already exists")
        collections = client.list_collections()
        collection_id = next(
            c['id'] for c in collections['collectionSummaries'] 
            if c['name'] == COLLECTION_NAME
        )
    
    # Step 4: Create data access policy
    print("4️⃣ Creating data access policy...")
    try:
        client.create_access_policy(
            name=f"{COLLECTION_NAME}-access",
            type="data",
            policy=json.dumps([{
                "Rules": [
                    {
                        "Resource": [f"collection/{COLLECTION_NAME}"],
                        "Permission": ["aoss:CreateCollectionItems", "aoss:DeleteCollectionItems", 
                                      "aoss:UpdateCollectionItems", "aoss:DescribeCollectionItems"],
                        "ResourceType": "collection"
                    },
                    {
                        "Resource": [f"index/{COLLECTION_NAME}/*"],
                        "Permission": ["aoss:CreateIndex", "aoss:DeleteIndex", "aoss:UpdateIndex",
                                      "aoss:DescribeIndex", "aoss:ReadDocument", "aoss:WriteDocument"],
                        "ResourceType": "index"
                    }
                ],
                "Principal": [
                    f"arn:aws:iam::{ACCOUNT_ID}:user/leducse-admin",
                    f"arn:aws:iam::{ACCOUNT_ID}:role/service-role/AmazonBedrockExecutionRoleForKnowledgeBase_*"
                ]
            }])
        )
        print("   ✓ Data access policy created")
    except client.exceptions.ConflictException:
        print("   ⚠ Data access policy already exists")
    
    # Step 5: Wait for collection to be active
    print("5️⃣ Waiting for collection to become ACTIVE...")
    while True:
        collections = client.list_collections()
        status = next(
            (c['status'] for c in collections['collectionSummaries'] if c['name'] == COLLECTION_NAME),
            None
        )
        print(f"   Status: {status}")
        if status == "ACTIVE":
            break
        elif status == "FAILED":
            print("   ❌ Collection creation failed!")
            return
        time.sleep(30)
    
    print()
    print("✅ OpenSearch Serverless restored!")
    print()
    print("Next steps:")
    print("1. Create the vector index using chatbot/create_index.py")
    print("2. Update the Bedrock Knowledge Base to use the new collection")
    print("3. Run a sync job to re-ingest documents")

if __name__ == "__main__":
    main()



