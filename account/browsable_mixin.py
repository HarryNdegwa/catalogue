from rest_framework import renderers

class AdminBrowsableMixin(object):

    def get_renderers(self):

        rends = self.renderer_classes
        if self.request.user and self.request.user.is_admin:
            rends.append(renderers.BrowsableAPIRenderer)
        return [renderer() for renderer in rends]
