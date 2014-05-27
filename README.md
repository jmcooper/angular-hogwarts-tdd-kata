Angular Hogwarts TDD Kata
=========================

Introduction
------------

Hogwarts has embraced Muggle Technology!

Young Wizard, you have been hired to create Hogwarts online student registration. You have been assigned a professor to guide you on your journey.

Because discipline is required of a Wizard, you will be writing it test first.

Setup
-----

Story: Show Course Catalog
--------------------------

Acceptance: Students will be able to see a catalog of classes.

---

How will you start, my young wizard friend? **By creating the html to display the catalog inside the ``<tbody>`` tag.**


### UI For Course Catalog

```html
<!-- catalog/catalog.html -->

...

                <tr ng-repeat="course in catalog">
                    <td>{{course.name}}</td>
                    <td>{{course.startTime | date: 'h:mm a'}}</td>
                    <td>{{course.professor}}</td>
                    <td>{{course.credits}}</td>
                </tr>
```

I see you will have a ``catalog`` array on the ``CatalogController`` scope. **Yes**

When will you load the catalog? **When the Controller is initialized.**

### Test 1: Erroring

Can you write it test first? **Yes! I am disiplined.**

```js
// test/catalog/catalog-controller-specs.js

describe('CatalogController', function () {

    describe('when the controller first loads', function () {

        it('should retrieve the course catalog', function () {
            expect(mockCatalogRepository.getCatalog.called).toBeTruthy();
        });

    });

});
```

Very nice, you wrote the description and the expectation first. Keeping the test simple will help your thinking.

What happens if you run it? **It will generate errors. You can see them by running ``app/tests/HogwartsTests.hmtl`` with the dev tools open.

See it says, Error cannot read property 'getCatalog' of undefined. It means my mockCatalogRepository is not setup.**

### Test 1: Failing

```js
// test/catalog/catalog-controller-specs.js

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

It is wise celebrate your failures, young wizard. **Yeah?!**

What are you doing inside ``beforeEach``? **We are creating a mock repository and a temporary scope. We then injuect thes mocks into the ``CatalogController``.**

### Test 1: Passing

How do you make it pass? **The test says we have to call getCatalog on the repository when CatalogController in initialized.**


```js
// catalog/js/catalog-controller.js

'use strict';

hogwartsApp
    .controller("CatalogController", ['$scope', 'CatalogRepository', function ($scope, catalogRepository) {
        catalogRepository.getCatalog();
    }]);
```

### Test 2: Failing

With your first test passing, are you done? **No we are not hooked up to the scope.**

```js
// test/catalog/catalog-controller-specs.js

...
    describe('when the controller first loads', function () {

        ...

        it('should put the catalog on the scope', function() {
            expect(scope.catalog).toEqual(catalog)
        });

        ...
```

### Test 2: Passing

```js
// catalog/js/catalog-controller.js

...
    .controller("CatalogController", ['$scope', 'CatalogRepository', function ($scope, catalogRepository) {
        $scope.catalog = catalogRepository.getCatalog();
    }]);
```

Are we finished with the story? **Before calling a story done it must be tested and deployed.**

But you are doing a Kata. **Ok, I won't deploy it and I won't write an automated test for it. But I must inspect the web page and make sure we can see the course catalog.


Story: Register for Courses from Course Catalog
-----------------------------------------------

Acceptance: Students register in course catalog then view their courses in schedule.

---

### UI for Registration

You have shown us how to test getting from a repository and displaying the results. I would like to see some interaction. **Sure, sure how about a link called register on the catalog page.**

That works for me. **Here is the updated catalog.html**

```html
<!-- catalog/catalog.html -->

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
```

We need a place to see the registered courses. **I am putting the UI for registered courses in ``wizard/schedule.html``

I am seeing duplication between the course catalog and the schedule. **Yes and I will take care of that later.**

OK. Where do you want to start? **In the course catalog controller of course.**

### Test 1: Failing
Don't you mean the course catalog controller spec. **Yes this is a TDD Kata after all.**

```js
// test/catalog/catalog-controller-specs.js

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
`` and stubbed it at the global level. You have mocked it inside a new ``describe`` block and written at test that says we are deligating the add class to the ``RegistrationService``. **Thank you.**

### Test 1: Passing

The ``CatalogController`` will a new ``REgistrationService`` parameter and a function added to the scope. **Yes, like this:**

```js
// catalog/js/catalog-controller.js

...

    .controller("CatalogController", [... 'RegistrationService', function (... registrationService) {

        ...

        $scope.register = function(courseId) {
            registrationService.register(courseId);
        };
    }]);
```

### Test 2

Very good. Next we need to see the result of our registration attempt. **I will put the ``RegistrationService`` response on the scope**

```js
// test/catalog/catalog-controller-specs.js

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

And to get it passing... **is as simple as adding ``$scope.register = ``**

```js
// catalog/js/catalog-controller.js

...

        $scope.register = function(courseId) {
            $scope.response = registrationService.register(courseId);
```

### Test 2: Refactor
I smell duplication. **Yes and I am willing to remove it with all my tests passing. I am adding a ``beforeEach`` and removing the duplication.**


```js
// test/catalog/catalog-controller-specs.js

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



<!--- vim: set ff=unix: -->
