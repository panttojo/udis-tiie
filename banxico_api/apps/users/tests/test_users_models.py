# Third Party Stuff
from django.test import TestCase

# Banxico Stuff
from apps.users.models import User


class UserModelTestCase(TestCase):
    def test_create_user(self):
        u = User.objects.create_user(username="f", email="f@f.com", password="abc", first_name="F", last_name="B")
        assert u.is_active is True
        assert u.is_staff is False
        assert u.is_superuser is False
        assert u.username == "f"
        assert u.email == "f@f.com"
        assert u.get_full_name() == "F B"
        assert u.get_short_name() == "F"
        assert str(u) == str(u.username)

    def test_create_super_user(self):
        u = User.objects.create_superuser(username="s", email="f@f.com", password="abc")
        assert u.is_active is True
        assert u.is_staff is True
        assert u.is_superuser is True
        assert str(u) == str(u.username)
