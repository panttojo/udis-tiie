# Third Party Stuff
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

# Banxico Stuff
from apps.base.models import UUIDModel


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, username: str, password: str, is_staff: bool, is_superuser: bool, **extra_fields):
        user = self.model(
            username=username, is_staff=is_staff, is_active=True, is_superuser=is_superuser, **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username: str, password=None, **extra_fields):
        """Creates and saves a User with the given username and password."""
        return self._create_user(username, password, False, False, **extra_fields)

    def create_superuser(self, username: str, password: str, **extra_fields):
        return self._create_user(username, password, True, True, **extra_fields)


class User(AbstractBaseUser, UUIDModel, PermissionsMixin):
    first_name = models.CharField(_("First Name"), max_length=120, blank=True)
    last_name = models.CharField(_("Last Name"), max_length=120, blank=True)
    username = models.CharField(_("username"), unique=True, db_index=True, max_length=120)
    email = models.EmailField(_("email address"), null=True, blank=True)
    is_staff = models.BooleanField(
        _("staff status"),
        default=False,
        help_text=_("Designates whether the user can log into this admin site."),
    )
    is_active = models.BooleanField(
        "active",
        default=True,
        help_text=_(
            "Designates whether this user should be treated as " "active. Unselect this instead of deleting accounts."
        ),
    )
    date_joined = models.DateTimeField(_("date joined"), default=timezone.localtime)

    USERNAME_FIELD = "username"
    objects = UserManager()

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")
        ordering = ("-date_joined",)

    def __str__(self):
        return self.username

    def get_full_name(self) -> str:
        """Returns the first_name plus the last_name, with a space in between."""
        full_name = "{} {}".format(self.first_name, self.last_name)
        return full_name.strip()

    def get_short_name(self) -> str:
        """Returns the short name for the user."""
        return self.first_name.strip()
