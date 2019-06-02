# Generated by Django 2.1.4 on 2019-06-02 20:52

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [("backend", "0001_initial")]

    operations = [
        migrations.CreateModel(
            name="Office",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("name", models.CharField(max_length=64, unique=True)),
                ("location", models.TextField(null=True)),
            ],
            options={"db_table": "office"},
        ),
        migrations.AddField(
            model_name="profile",
            name="office",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="backend.Office",
            ),
        ),
    ]
