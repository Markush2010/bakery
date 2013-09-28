# -*- coding: utf-8 -*-

from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import ugettext_lazy as _

from jsonfield import JSONField


class Cookie(models.Model):
    name = models.CharField(_('Name'), max_length=50)
    url = models.URLField(_('URL'))
    owner = models.ForeignKey(get_user_model(), verbose_name=_('User'),
        on_delete=models.CASCADE)
    description = models.TextField(_('Description'), default='')
    license = models.CharField(_('License'), max_length=50, default='')
    last_change = models.DateTimeField(_('Last change'))
    last_post = models.DateTimeField(_('Last poll'))
    mapping = JSONField()

    class Meta:
        verbose_name = _('Cookie')
        verbose_name_plural = _('Cookies')

    def __unicode__(self):
        return self.name
