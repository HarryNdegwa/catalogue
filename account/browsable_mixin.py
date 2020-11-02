from rest_framework import renderers
from django.contrib.auth.models import AnonymousUser

class AdminBrowsableMixin(object):

    def get_renderers(self):

        rends = self.renderer_classes
        if not isinstance(self.request.user,AnonymousUser) and self.request.user.is_admin:
            rends.append(renderers.BrowsableAPIRenderer)
        return [renderer() for renderer in rends]
