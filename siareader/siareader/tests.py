from django.test import LiveServerTestCase
from selenium import webdriver

class ReaderUserTestCase(LiveServerTestCase):

    def setUp(self):
        self.browser = webdriver.Firefox()
        self.browser.implicitly_wait(2)

    def test_user_can_read(self):
        """
        Test that a user can visit the landing page and see the reader.
        """

        # user may or may not be registered
        # the basic reader should be visible

        home_page = self.browser.get(self.live_server_url + '/')

        # user should see some basic markup
        logo = self.browser.find_element_by_id('sialogo')
        self.assertEqual('Synesthesia Reader', logo.text)


        self.fail('Incomplete test.')

    def tearDown(self):
        self.browser.quit()
