Angular Hogwarts TDD Kata
=========================

Introduction
------------

Hogwarts has embraced Muggle Technology!

Professor Author Weasley has just invented the first steam powered computer and it works at Hogwarts.

---

Young Wizard, you will be creating Hogwarts online student registration. Professor Neville Longbottom will guide you.

Because you are a highly discipline Wizard, you will be writing your code test first.

Setup
-----

Story: Show Course Catalog
--------------------------

Acceptance: Students will be able to see a catalog of classes.

---

How will you start, my young wizard friend? **By creating the html to display the catalog inside the ``<tbody>`` tag.**


### UI For Course Catalog

``app/catalog/catalog.html``
```html

...

            <tbody>
                <tr ng-repeat="course in catalog">
                    <td>{{course.name}}</td>
                    <td>{{course.startTime | date: 'h:mm a'}}</td>
                    <td>{{course.professor}}</td>
                    <td>{{course.credits}}</td>
                </tr>
```

I see you will have a ``catalog`` array on the ``CatalogController`` scope. **Yes, you will.**

When will you load the catalog? **When the Controller is initialized.**

### Test 1: Make it Error

Can you write a test to show me what you mean? **Sure**

``test/catalog/catalog-controller-specs.js``
```js

describe('CatalogController', function () {

    describe('when the controller first loads', function () {

        it('the course catalog is retrieved', function () {
            expect(mockCatalogRepository.getCatalog.called).toBeTruthy();
        });

    });

});
```

Very nice, you wrote the description and the expectation first. Keeping the test simple helps your thinking.

What happens if you run it? **It will generate errors. You can see them by running ``test/HogwartsTests.hmtl`` with the dev tools open.**

What is the meaning of: "Error cannot read property 'getCatalog' of undefined."? **It means my mockCatalogRepository is not setup.**

### Test 1: Make it Fail

You are setup the 

Refresh your test page to rerun the tests.

``test/catalog/catalog-controller-specs.js``
```js
...
describe('CatalogController', function () {

    var mockCatalogRepository,
        scope,
        catalog = ["catalog"];

    beforeEach(function () {
        module("hogwartsApp");

        inject(function ($rootScope, $controller, CatalogRepository) {
            scope = $rootScope.$new();

            mockCatalogRepository = sinon.stub(CatalogRepository);
            mockCatalogRepository.getCatalog.returns(catalog);

            $controller("CatalogController", { $scope: scope, CatalogRepository: mockCatalogRepository  });
        });
    });
```

Does it pass now? **No, but we are making progress. We are seeing a failing test.**

It is wise to celebrate your failures, young wizard. **Yeah?!**

What are you doing inside ``beforeEach``? **We are creating a mock repository and a temporary scope. We then inject the mocks into the ``CatalogController``.**

### Test 1: Make it Pass

How do you make it pass? **The test says we have to call getCatalog on the repository when CatalogController in initialized.**


``app/catalog/catalog-controller.js``
```js

'use strict';

hogwartsApp
    .controller("CatalogController", ['$scope', 'CatalogRepository', function ($scope, catalogRepository) {
        catalogRepository.getCatalog();
    }]);
```

### Test 1: Refactor it

Whenever your tests are passing, you might consider refactoring. **I don't see anything that needs refactoring.**

### Test 2: Failing

You have completed your first test. One point for Hufflepuff. Is the story complete? **No, the catalog will not show on the web page. I will hooked up to the scope now.**

``test/catalog/catalog-controller-specs.js``
```js

...
    describe('when the controller first loads', function () {

        ...

        it('should put the catalog on the scope', function() {
            expect(scope.catalog).toEqual(catalog)
        });

        ...
```

### Test 2: Passing

``catalog/catalog-controller.js``
```js

...
    .controller("CatalogController", ['$scope', 'CatalogRepository', function ($scope, catalogRepository) {
        $scope.catalog = catalogRepository.getCatalog();
    }]);
```

Are we finished with the story? **Before calling a story done, it must be tested and deployed.**

But this is only a Kata, we will start on the real work next week when you have a pair. **Ok, I won't deploy it and I won't write automated tests. But I must inspect my beautiful work (and make sure it is working).

You can see it by loading ``app/index.html`` into your browser. **I am seeing the page now.**

Sweet, you have finished your story. Another point for Hufflepuff. **Thank you, I like the write the test, see it fail, write code to make it pass, and then refactor rhythm. I also like seeing what the end user sees.

Story: Register for Courses
---------------------------

Acceptance: Students register in course catalog then view their courses in schedule.

---

### UI for Registration

You have shown us how to test getting from a repository and displaying the results. I would like to see some interaction. **Sure, sure how about a link called register on the catalog page.**

That works for now. **Here is the updated catalog.html**

``app/catalog/catalog.html``
```html

...

            <thead>
                <tr>
                    ...
                    <th>Register</th>
                </tr>
            </thead>
            <tbody>
                <tr ng-repeat="course in catalog">
                    ...
                    <td><a href="javascript:void(0);" ng-click="register(course.id)">Register</a></td>
                </tr>
```

We need a place to see the registered courses. **I am putting the UI for registered courses in ``wizard/schedule.html``

I am seeing duplication between the course catalog and the schedule. **Yes and I will take care of that later.**

OK. Where do you want to start? **In the course catalog controller of course.**

### Test 1: Failing
Don't you mean the course catalog controller spec. **Yes this is a TDD Kata after all.**

``test/catalog/catalog-controller-specs.js``
```js

...

describe('CatalogController', function () {

    var mockCatalogRepository,
        mockRegistrationService,
        ...

    beforeEach(function () {
        ...

        inject(function (... RegistrationService) {
            ...

            mockRegistrationService = sinon.stub(RegistrationService);

    ...

    describe('when registering for a class', function() {
        var courseId = 'courseId';
        var response = {success: true, message: ''};

        it('adds the class to the wizard\'s schedule', function() {
            mockRegistrationService.register.returns(response);
            scope.register(courseId);
            expect(mockRegistrationService.register.calledWith(courseId)).toBeTruthy();
        });

    });
```

You have done amazing work. You added a ``mockRegistrationService
`` and stubbed it at the top level. You have mocked it inside a new ``describe`` block and written a test that says we are delegating the add class to the ``RegistrationService``. **Thank you. I am running the tests again.**

### Test 1: Passing

The ``CatalogController`` will need a new ``RegistrationService`` parameter and a function added to the scope. **Yes, like this:**

``app/catalog/catalog-controller.js``
```js

...

    .controller("CatalogController", [... 'RegistrationService', function (... registrationService) {

        ...

        $scope.register = function(courseId) {
            registrationService.register(courseId);
        };
    }]);
```

### Test 2

Very good you remembered to run the tests again. Next we need to see the result of our registration attempt. **I will put the ``RegistrationService`` response on the scope**

``test/catalog/catalog-controller-specs.js``
```js

...

    describe('when registering for a class', function() {

        ...

        it('adds the registration response to the scope', function() {
            mockRegistrationService.register.returns(response);
            scope.register(courseId);
            expect(scope.response).toEqual(response);
        });
```

### Test 2: Passing

And to get it passing... **is as simple as adding ``$scope.response = ``**

``app/catalog/catalog-controller.js``
```js

...

        $scope.register = function(courseId) {
            $scope.response = registrationService.register(courseId);
```

### Test 2: Refactor
I smell duplication. **Yes and I am willing to remove it with all my tests passing. I am adding a ``beforeEach`` and removing the duplication.**


``test/catalog/catalog-controller-specs.js``
```js

...

    describe('when registering for a class', function() {

        ...

        beforeEach(function() {
            mockRegistrationService.register.returns(response);
            scope.register(courseId);
        });

        it('adds the class to the wizard\'s schedule', function() {
            expect(mockRegistrationService.register.calledWith(courseId)).toBeTruthy();
        });

        it('adds the registration response to the scope', function() {
            expect(scope.response).toEqual(response);
        });
    });
```

Are your test still passing? **Yes.**

Are you finished with this story? **No. We are delegating to the ``RegistrationService`` which we haven't written yet.**

### Test 3: RegistrationService.register: Happy Path

``test/wizard/registration-service-spec.js``
```js

describe('RegistrationService', function () {

    describe('when registering for a course', function () {

        it ('saves the course to the WizardRepository', function() {
            registrationService.register(course.id);
            expect(mockWizardRepository.save.calledWith({classes: [course]})).toBeTruthy();
        });

    });
```

I see when registering you are saving it to the ``WizardRepository``. **Yes. I will add enough to make it fail.**

### Test 3: Failing

Looking at your test, you obviously need a ``mockWizardRepository`` that has a ``save`` method. But how are you going to convert ``course.id`` into a ``course``?  **I am going to get all the courses from the ``CatalogRepository`` and then iterate over them until I find the one I want.**

That would have the code smell: **Inappropriate intimacy**. Can you think of another way? **Thank you. I missed the method ``findById`` on the ``CatalogRepository``.


``test/wizard/registration-service-spec.js``
```js

describe('RegistrationService', function () {

    var registrationService,
        catalogRepository,
        mockWizardRepository;

    beforeEach(function () {
        module("hogwartsApp");

        inject(function (RegistrationService, CatalogRepository, WizardRepository) {
            registrationService = RegistrationService;
            mockCatalogRepository = sinon.stub(CatalogRepository);
            mockWizardRepository = sinon.stub(WizardRepository);
        });
    });

    describe('when registering for a course', function () {
        var course = {id: 'foo'}
        ;

        beforeEach(function() {
            mockCatalogRepository.findCourseById.returns(course);
            mockWizardRepository.get.returns({classes: []});
        });

        ...
```

### Test 3: Passing

``wizard/registration-service.js``
```js

...

hogwartsApp
.factory('RegistrationService', ['WizardRepository', function(wizardRepository) {
    return {
        register: function(courseId) {
          wizard.classes.push(course);
          wizardRepository.save(wizard);
```

        var response;

            var courseCatalog = [course];
            mockCatalogRepository.getCatalog.returns(courseCatalog);
            response = registrationService.register(course.id);

        it('should return a success response', function () {
            expect(response.success).toBeTruthy();
        });

        it('should return an empty message', function() {
            expect(response.message).toEqual('');
        });

