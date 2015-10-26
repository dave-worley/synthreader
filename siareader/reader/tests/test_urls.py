from django.test import TestCase
from django.core.urlresolvers import resolve
from reader.views import index

class UserProfileURLsTestCase(TestCase):

    """
    Test that the user can visit profile URLs
    """

    def test_root_url(self):
        root = resolve('/')
        self.assertEqual(root.func, index)
