from datetime import datetime, timedelta
from zoneinfo import ZoneInfo
from random import randint
import json


def create_training_records():
    # ランニング
    sample1 = {
        "id": 1,
        "userId": 1,
        "trainingItemId": 1,
    }

    # プール
    sample2 = {
        "id": 2,
        "userId": 1,
        "trainingItemId": 2,
    }

    # ウォーキング
    sample3 = {
        "id": 3,
        "userId": 1,
        "trainingItemId": 3,
    }

    # 腕立て
    sample4 = {
        "id": 4,
        "userId": 1,
        "trainingItemId": 4,
    }

    sample_data = []

    start_date = datetime(2023, 4, 1, 15, tzinfo=ZoneInfo(key="Asia/Tokyo"))
    end_date = datetime(2023, 9, 30, 15, tzinfo=ZoneInfo(key="Asia/Tokyo"))

    for date in date_range(start_date, end_date):
        sample1["record"] = randint(1, 2)
        sample1["date"] = int(date.timestamp())
        sample_data.append(sample1.copy())

        sample2["record"] = randint(30, 120)
        sample2["date"] = int(date.timestamp())
        sample_data.append(sample2.copy())

        sample3["record"] = randint(30, 120)
        sample3["date"] = int(date.timestamp())
        sample_data.append(sample3.copy())

        sample4["record"] = randint(20, 40)
        sample4["date"] = int(date.timestamp())
        sample_data.append(sample4.copy())

    print(sample_data)
    output_str = json.dumps(sample_data, indent=2)
    output_sample_data(output_str, "./TrainingRecords.json")


def date_range(start_date, end_date):
    for i in range((end_date - start_date).days + 1):
        yield start_date + timedelta(i)


def output_sample_data(output_str, output_file_path):
    f = open(output_file_path, "w")
    f.write(output_str)
    f.close()


create_training_records()
